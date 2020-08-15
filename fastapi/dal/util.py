import cassandra
from cassandra.auth import PlainTextAuthProvider
from cassandra.cluster import Cluster


def get_cassandra_conn(keyspace="users"):
    """Retrieve a connection to Cassandra DB

    On the first run:
        - Init the connection 
        - Create keyspace / tables
        - Insert basic data
    All other runs:
        - Return the session for the keyspace
    """
    try:
        auth_provider = PlainTextAuthProvider(
            username="cassandra", password="cassandra"
        )
        cluster = Cluster(auth_provider=auth_provider)
        session = cluster.connect(keyspace)
        # session.execute("DROP KEYSPACE users")
    except (cassandra.InvalidRequest, cassandra.cluster.NoHostAvailable):
        cluster = Cluster(["0.0.0.0"], auth_provider=auth_provider)
        session = cluster.connect()
        with open("./dal/fixtures.cql", mode="r") as f:
            cql = f.readline()
            while cql:
                session.execute(cql)
                cql = f.readline()
    return session
