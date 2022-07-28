const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlers engine and views location 
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath); 


//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'weather App',
        name:'kripal sojitra'
    })
})
app.get('/about',(req,res)=>{ 
    res.render('about',{
        title:'About me',
        name:'kripal sojitra'
    })
})      

app.get('/help',(req,res)=>{
    res.render('help',{ 
        helpText:'this is some helpful text',
        title:'Help',
        name:'kripal sojitra'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }   
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
            return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('Error',{ 
        Error:"help article not found ",
        title:'404',
        name:'kripal sojitra'
    })
})

app.get('*',(req,res) =>{
    res.render('Error',{
        Error:"Page not found",
        title:'404',
        name:'kripal sojitra'
    })
})

app.listen(3001, () => {
    console.log('server is up on the port 3001');
});