module.exports = {
    remainingDays(job){
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
        const createdDate = new Date(job.created_at);
        //O tempo em dias do mes
        const dueDay = createdDate.getDate() + Number(remainingDays);
        //O tempo em millisegundo
        const duaDateInMS = createdDate.setDate(dueDay);
    
        const timeDiffInMs = duaDateInMS - Date.now();
        //Transformar milli em dias do mes
        
        const dayInMs = 1000 * 60 * 60 * 24;
        //math.floor calcula para baixa o valor
        const dayDiff = Math.floor(timeDiffInMs / dayInMs);
        
        return dayDiff
    
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}