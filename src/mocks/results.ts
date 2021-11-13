export const searchResults = {
  "snippet-format": "snippet",
  "total": 3,
  "start": 1,
  "page-length": 10,
  "results": [
    {
      "index": 1,
      "uri": "/Person/Person1.json",
      "path": "fn:doc(\"/Person/Person1.json\")",
      "score": 0,
      "confidence": 0,
      "fitness": 0,
      "href": "/v1/documents?uri=%2FPerson%2FPerson1.json",
      "mimetype": "application/json",
      "format": "json",
      "matches": [
        {
          "path": "fn:doc(\"/Person/Person1.json\")/envelope/headers/array-node(\"sources\")/object-node()[2]/text(\"datahubSourceType\")",
          "match-text": [
            {
              "highlight": "JSON"
            }
          ]
        }
      ],
      "primaryKey": {
        "propertyPath": "customerId",
        "propertyValue": 105
      },
      "identifier": {
        "propertyPath": "identifier",
        "propertyValue": 105
      },
      "entityName": "Customer",
      "createdOn": "2021-10-28T22:47:18.695808-07:00",
      "createdBy": "admin",
      "entityInstance": {
        "customerId": 105,
        "name": [
          "Hollan Welles",
          "Holland Wells"
        ],
        "email": "hwelles@example.org",
        "phone": "415-555-1234",
        "image": "https://cdn1.marklogic.com/wp-content/uploads/2021/07/chuck-hollis.jpeg",
        "address": {
          "street": "Sunnyside Avenue",
          "city": "Brutus",
          "state": "Wisconsin",
          "zip": {
            "fiveDigit": "30706",
            "plusFour": "8854"
          }
        },
        "status": "Active",
        "ssn": "123-45-6789",
        "sources": [
          "USA Today",
          "New York Times"
        ],
      }
    },
    {
      "index": 2,
      "uri": "/Person/Person2.json",
      "path": "fn:doc(\"/Person/Person2.json\")",
      "score": 0,
      "confidence": 0,
      "fitness": 0,
      "href": "/v1/documents?uri=%2FPerson%2FPerson2.json",
      "mimetype": "application/json",
      "format": "json",
      "matches": [
        {
          "path": "fn:doc(\"/Person/Person2.json\")/envelope/headers/array-node(\"sources\")/object-node()[2]/text(\"datahubSourceType\")",
          "match-text": [
            {
              "highlight": "JSON"
            }
          ]
        }
      ],
      "primaryKey": {
        "propertyPath": "customerId",
        "propertyValue": 101
      },
      "identifier": {
        "propertyPath": "identifier",
        "propertyValue": 101
      },
      "entityName": "Customer",
      "createdOn": "2021-10-28T22:47:18.695808-07:00",
      "createdBy": "admin",
      "entityInstance": {
        "customerId": 101,
        "name": "Carmella Hardin",
        "email": "carmella@example.com",
        "phone": "510-555-4321",
        "image": "https://cdn1.marklogic.com/wp-content/uploads/2018/02/trinh-lieu-profile.jpg",
        "address": {
          "street": "Anna Court",
          "city": "Stewart",
          "state": "Kansas",
          "zip": {
            "fiveDigit": "66601",
            "plusFour": "6783"
          }
        },
        "status": "Active",
        "ssn": "111-11-1111",
        "sources": [
          "New York Times"
        ],
      }
    },
    {
      "index": 3,
      "uri": "/Person/Person7.json",
      "path": "fn:doc(\"/Person/Person7.json\")",
      "score": 0,
      "confidence": 0,
      "fitness": 0,
      "href": "/v1/documents?uri=%2FPerson%2FPerson7.json",
      "mimetype": "application/json",
      "format": "json",
      "matches": [
        {
          "path": "fn:doc(\"/Person/Person7.json\")/envelope/headers/array-node(\"sources\")/object-node()[2]/text(\"datahubSourceType\")",
          "match-text": [
            {
              "highlight": "JSON"
            }
          ]
        }
      ],
      "primaryKey": {
        "propertyPath": "customerId",
        "propertyValue": 102
      },
      "identifier": {
        "propertyPath": "identifier",
        "propertyValue": 102
      },
      "entityName": "Customer",
      "createdOn": "2021-10-28T22:47:18.695808-07:00",
      "createdBy": "admin",
      "entityInstance": {
        "customerId": 102,
        "name": "Adams Cole",
        "email": "ac@example.net",
        "phone": "925-555-9876",
        "image": "https://cdn1.marklogic.com/wp-content/uploads/2021/02/1612313387205.jpeg",
        "address": {
          "street": "Varick Avenue",
          "city": "Mooresburg",
          "state": "Delaware",
          "zip": {
            "fiveDigit": "17654",
            "plusFour": "1292"
          }
        },
        "status": "Inactive",
        "ssn": "222-22-2222",
        "sources": [
          "Chicago Tibune",
          "USA Today"
        ]
      }
    }
  ],
  "facets": {
    "entities": {
      "type": "xs:string",
      "facetValues": [
        {
          "name": "Person",
          "count": 7853548,
          "value": "Person"
        },
        {
          "name": "Place",
          "count": 2566911,
          "value": "Place"
        },
        {
          "name": "Thing",
          "count": 4890720,
          "value": "Thing"
        }
      ]
    },
    "sources": {
      "type": "xs:string",
      "facetValues": [
        {
          "name": "New York Times",
          "count": 1422088,
          "value": "New York Times"
        },
        {
          "name": "USA Today",
          "count": 568221,
          "value": "Place"
        },
        {
          "name": "Chicago Tribune",
          "count": 43276,
          "value": "Chicago Tribune"
        }
      ]
    },
    "createdOn": {
      "type": "xs:date",
      "facetValues": []
    },
    "status": {
      "type": "xs:string",
      "facetValues": [
        {
          "name": "Active",
          "count": 13028854,
          "value": "Active"
        },
        {
          "name": "Inactive",
          "count": 2053269,
          "value": "Inactive"
        }
      ]
    }
  },
  "qtext": "entityType:\"Person\" hideHubArtifacts:true",
  "metrics": {
    "query-resolution-time": "PT0.055947S",
    "facet-resolution-time": "PT0.029286S",
    "snippet-resolution-time": "PT0.005214S",
    "total-time": "PT0.093637S"
  },
  "selectedPropertyDefinitions": [],
  "entityPropertyDefinitions": []
};
