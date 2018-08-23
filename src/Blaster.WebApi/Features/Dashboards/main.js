import moment from "moment";
import jq from "jquery";
import DashboardEditor from "./dashboard-editor.js";
import AlertDialog from "./alert-dialog.js";
import "./styles.scss";

const app = new Vue({
    el: '#app',
    data: {
        items: []
    },
    computed: {
        totalCount: function() {
            return this.items.length;
        }
    },
    methods: {
        newItem: function() {
            const item = {
                name: "",
                team: "",
                content: ""
            };

            const editor = new DashboardEditor();
            editor.open(item)
                .then(item => {
                    return jq.ajax({
                        type: "POST",
                        url: "api/dashboards",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(item) 
                    });
                })
                .then(data => {
                    app.items.push({
                        id: data.id,
                        team: data.team,
                        name: data.name,
                        lastModified: data.lastModified
                    });
                })
                .catch(info => {
                    console.log("item: " + JSON.stringify(item));
                    console.log("OHNO!! " + JSON.stringify(info));
                });
        },
        openEditor: function(item) {
            jq.getJSON(`api/dashboards/${item.id}`)
                .then(data  => {
                    return Object.assign(item, { 
                        content: data.content 
                    });
                })
                .then(dataItem => {
                    const editor = new DashboardEditor();
                    return editor.open(dataItem);
                })
                .then(dataItem => {
                    item.name = dataItem.name;
                    item.team = dataItem.team;
                });
        }
    }
});

jq.ready
    .then(() => jq.getJSON("api/dashboards"))
    .then(data => {
        data.items.forEach(item => {
            app.items.push(item);
        });
    })
    .catch(info => {
        const dialog = new AlertDialog();

        dialog
            .open({
                message: `Server returned: ${info.status} - ${info.statusText}`
            })
            .then(element => {
                setTimeout(function(){
                    dialog.close(element);
                }, 3000);
            });
    });

// jq.ready
//     .then(() => {
//         setInterval(() => {
//             jq(".format-as-relative-time").each(() => {
//                 const time = jq(this).data("timestamp");
//                 if (time) {
//                     const text = moment(time).fromNow();
//                     jq(this).text(text);
//                     console.log(text);
//                 }
//             });
//         }, 1000);
//     });