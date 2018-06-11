import gql from 'graphql-tag';

export const GQL_TIMESHEET_GET_TASKS = gql`
    query TimesheetGetTasks($fromDate: String!, $toDate: String!, $uid: String!){
        timesheetRecordEntityQuery(
            filter: {
                conjunction: AND,
                conditions: [
                    {operator: GREATER_THAN_OR_EQUAL, field: "field_date", value: [$fromDate]},
                    {operator: SMALLER_THAN_OR_EQUAL, field: "field_date", value: [$toDate]},
                    {operator: EQUAL, field: "user_id", value: [$uid]}
                ]
            }
        ) {
            entities{
                ...on TimesheetRecordEntity {
                    fieldDate {
                        value
                        date
                    }
                    fieldHours
                    fieldTask {
                        targetId
                        ...on FieldTimesheetRecordEntityFieldTask {
                            entity {
                                id
                                entityLabel
                                entityUuid
                            }
                        }
                    }
                    fieldProject {
                        targetId
                        ...on FieldTimesheetRecordEntityFieldProject {
                            entity {
                                id
                                entityLabel
                                entityUuid
                            }
                        }
                    }
                }
                entityId
                entityUrl {
                    path
                    routed
                }
                entityUuid
                entityLabel
            }
        }
    }
    `;

export const gqlTimesheetRecordById = gql`
    query gqlTimesheetRecordById($id: String!) {
        timesheetRecordEntityById(id: $id) {
            fieldDate {
                value
                date
            }
            fieldTask {
                targetId
                ...on FieldTimesheetRecordEntityFieldTask {
                    entity {
                        id
                        entityLabel
                        entityUuid
                    }
                }
            }
            fieldProject {
                targetId
                ...on FieldTimesheetRecordEntityFieldProject {
                    entity {
                        id
                        entityLabel
                        entityUuid
                    }
                }
            }
        }
    }
`

export const GQL_USER_PROFILE = gql`
    query UserById($uid: String!){
        userById(id: $uid) {
            uid
            uuid
            name
            mail
            timezone
            status
            created
            changed
            access
            login
            init
            defaultLangcode
            entityRendered
        }
    }
`;