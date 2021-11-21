import React, {useState, useEffect, useContext} from "react";
import { SearchContext } from "../../store/SearchContext";
import Graph from "react-graph-vis";
import styles from "./Relationships.module.scss";

type Props = {
  data?: any;
  config?: any 
};

const Relationships: React.FC<Props> = (props) => {

    const ctx = useContext(SearchContext);

    const [network, setNetwork] = useState<any>(null);
    const initNetworkInstance = (networkInstance) => {
        setNetwork(networkInstance);
    };
    useEffect(() => {
        if (network) {
            //network.stabilize();
        }
    }, [network]);

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000"
        },
        physics: {
            enabled: true,
            barnesHut: {
              springLength: 160,
              springConstant: 0.01,
              avoidOverlap: 1
            },
            stabilization: {
              enabled: true,
              iterations: 1,
            }
        },
        interaction: {
            hover: true,
        },
    };

    const graph = {
        nodes: [
          { id: "105", shape: "image", size: 30, image: "https://cdn1.marklogic.com/wp-content/uploads/2021/07/chuck-hollis.jpeg" },
          { id: "101", shape: "image", size: 30, image: "https://cdn1.marklogic.com/wp-content/uploads/2018/02/trinh-lieu-profile.jpg" },
          { id: "102", shape: "image", size: 30, image: "https://cdn1.marklogic.com/wp-content/uploads/2021/02/1612313387205.jpeg" },
          { id: "990", shape: "image", size: 30, image: "https://cdn1.marklogic.com/wp-content/uploads/2020/11/george-bloom-headshot-300x300-1.jpg" },
          { id: "991", shape: "image", size: 30, image: "https://cdn1.marklogic.com/wp-content/uploads/2020/04/JamesKenwood-headshot-600x600-1.jpg" },
        ],
        edges: [
          { from: "105", to: "101", label: "relatedTo", font: { align: "top" } },
          { from: "101", to: "102", label: "relatedTo", font: { align: "top" } },
          { from: "102", to: "105", label: "worksWith", font: { align: "top" } },
          { from: "102", to: "990", label: "livesWith", font: { align: "top" } },
          { from: "101", to: "991", label: "worksWith", font: { align: "top" } },
        ]
      };

    const events = {
        select: ({ nodes, edges }) => {
            if (nodes && nodes[0]) {
                ctx.handleDetail(nodes[0]);
            }
        },
        hoverNode: (event) => {
            console.log("hoverNode", event);
            event.event.target.style.cursor = "pointer";
        }
    };

    return (
        <div className={styles.relationships}>
            <Graph
                graph={graph}
                options={options}
                events={events}
                getNetwork={initNetworkInstance}
            />
        </div>
    );
};

export default Relationships;
