const express = require('express');
const routes= express.Router();
const ProfileController = require('./controllers/ProfileController')

const Job = {
    data: [
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
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress';
    
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job,Profile.data["value-hour"]),
                }
            })
            return res.render("index" , {profile:Profile.data, jobs:updatedJobs})
        
        },

        create(req, res) {
            return res.render("job")
        },

        save (req, res){

            const lastId = (Job.data[Job.data.length - 1]?.id || 0) + 1;
            //O array Jobs está recebendo todos os post 
            //que geram req quando na aba /job é salvo algum Job
            Job.data.push({
                id: lastId,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            });
        
            return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id
            const job = Job.data.find( job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render("job-edit", {job})
        },

        update(req, res) {
            const jobId = req.params.id
            const job = Job.data.find( job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job =>{
                if(Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }
                return job
            })

            res.redirect('/job/' + jobId)

        },

        delete(req, res) {
            const jobId = req.params.id
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId)) 

            return res.redirect('/')
        }
    },

    services: {
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
    },
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
// Como a propriedade profile tem tem o mesmo nome da const profile, podemos colocar sesomente profile, conforme abaixo 
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;
 
