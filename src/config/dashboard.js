export const configDashboard = { 
    metrics: [
        {
            title: "New entities this week",
            value: "metrics.entities.value",
            color: "#70d8c1"
        },
        {
            title: "Sources added this week",
            value: "metrics.sources.value",
            color: "#f5d881"
        },
        {
            title: "Tasks created today",
            value: "metrics.tasks.value",
            color: "#ffbd8e"
        },
        {
            title: "Activities unassigned",
            value: "metrics.activities.value",
            color: "#ff984e"
        }
    ],
    // metrics: null
    saved: {
        cols: [
            {
                title: null,
                type: "icon",
                value: "hasChanges",
                test: function (value) {return value},
                sortable: false
            },
            {
                title: "Name",
                type: "text",
                value: "name",
                sortable: true
            },
            {
                title: "Edited On",
                type: "date",
                value: "updatedOn",
                sortable: true
            },
            {
                title: "Watching",
                type: "icon",
                value: "isWatching",
                test: function (value) {return value},
                sortable: true
            }
        ]
    }
};