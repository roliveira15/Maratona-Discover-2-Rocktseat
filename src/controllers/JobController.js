const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    save (req, res){
        const jobs = Job.get()
        const lastId = (jobs[jobs.length - 1]?.id || 0) + 1;
        //O array Jobs está recebendo todos os post 
        //que geram req quando na aba /job é salvo algum Job
        jobs.push({
            id: lastId,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        });
    
        return res.redirect('/')
    },

    show(req, res) {
        const jobs = Job.get()
        const jobId = req.params.id
        const profile = Profile.get()
        const job = jobs.find( job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
     
        return res.render("job-edit", { job:job })
    },

    update(req, res) {
        const jobs = Job.get()
        
        const jobId = req.params.id
        const job = jobs.find( job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobs.map(job => {
            if(Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })

        Job.update(newJobs)

        res.redirect('/job/' + jobId)

    },

    delete(req, res) {
        const jobId = req.params.id
        Job.delete(jobId)

        return res.redirect('/')
    }
}