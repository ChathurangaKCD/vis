export interface Service {
    id: number;
    type: 'gRPC' | 'HTTP';
    dependsOn: number[];
}