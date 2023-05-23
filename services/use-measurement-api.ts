import { gql, useQuery } from "@apollo/client";

const MEASUREMENT_QUERY = gql`
    query MeasurementQuery($devices: [String]){
        measurement(filter:{device: $devices}) {
            type
            value
            timestamp
        }
    }
`

export default function useMeasurementApi({ devices }: { devices: string[] }) {
    return useQuery(MEASUREMENT_QUERY, { variables: { devices } })
}