let data = [
    {
        id:1,
        name:"Pizzaria Guloso",
        "daily-hours": 1,
        "total-hours": 1,
        created_at: Date.now(),
    },
    {
        id:2,
        name:"OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now(),
    }
];

module.exports = {
    get(){
        return data;
    },

    update(newJob){
        data = newJob;
        return 
    },

    delete(id){
        data = data.filter(data => Number(data.id) !== Number(id)) 
    }
} 