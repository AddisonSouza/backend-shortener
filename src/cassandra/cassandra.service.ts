import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Client } from "cassandra-driver";

@Injectable()
export class CassandraService implements OnModuleInit, OnModuleDestroy {

    private client: Client;

    async onModuleInit() {
        this.client = new Client({
            contactPoints: [process.env.CASSANDRA_ADRESS || 'localhost'],
            localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER || 'datacenter1',
            keyspace: process.env.CASSANDRA_KEYSPACE || 'default_keyspace',
        });

        try {
            await this.client.connect();
            console.log('Connected to Cassandra');
        } catch (error) {
            console.error('Failed to connect to Cassandra', error);
        }
    }

    getClient(): Client {
        return this.client;
    }

    async onModuleDestroy() {
        await this.client.shutdown();
        console.log('Disconnected from Cassandra');
    }
}