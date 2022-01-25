require('../models/database');
const {diamaster,gaugemaster,fabricmaster,yarnmaster,colormaster,millmaster,machinemaster,taxmaster,companymaster} = require('../models/mastermodel');



//--------------GET MASTER---------------------------

exports.diapage = async(req,res) => {
  try{
    const dias = await diamaster.find({});
    res.render('diamaster',{dias});
  }
  catch(error){
    res.send('error occured');
  }
}

exports.gaugepage = async(req,res) => {
  try{
    const gauges = await gaugemaster.find({});
    res.render('gaugemaster',{gauges});
  }
  catch(error){
    res.send('error occured ',error);
  }
}

exports.fabricpage = async(req,res) => {
  try{
    const fabrics = await fabricmaster.find({});
    res.render('fabricmaster',{fabrics});
  }
  catch(error){
    res.send('error occured ',error);
  }
}

exports.yarnpage = async(req,res) => {
  try{
    const yarns = await yarnmaster.find({});
    res.render('yarnmaster',{yarns});
  }
  catch(error){
    res.send('error occured ',error);
  }
}

exports.colorpage = async(req,res) => {
  try{
    const colors = await colormaster.find({});
    res.render('colormaster',{colors});
  }
  catch(error){
    res.send('error occured ',error);
  }
}

exports.millpage = async(req,res) => {
  try{
    const mills = await millmaster.find({});
    res.render('millmaster',{mills});
  }
  catch(error){
    res.send('error occured ',error);
  }
}

exports.machinepage = async(req,res) => {
  try{
    const dias = await diamaster.find({});
    const gauges = await gaugemaster.find({});
    const machines = await machinemaster.find({});
    res.render('machinemaster' ,{dias,gauges,machines});
  }
  catch(error){
    res.send('error occured ' ,error);
  }
}

exports.taxpage = async(req,res) => {
  try{
    const taxs = await taxmaster.find({});
    res.render('taxmaster' ,{taxs});

  }
  catch(error){
    res.send('error occured ' ,error);
  }
}

exports.createpage = async(req,res) => {
  try{
      res.render('create',{name:req.body.mastername});
  }
  catch(error){
    res.send('error occured' ,error);
  }
}

exports.companypage = async(req,res) => {
  try{
    const companies = await companymaster.find({})
    res.render('companymaster',{companies});
  }
  catch(error){
    res.send('error occured' ,error)
  }
}
//---------------------POST MASTERS-----------------------------------

exports.searchMaster = async(req,res) => {
  try{

    if(req.body.page=='diamaster')
    {
      const dias = await diamaster.find({Dia:req.body.name});
      res.render('diamaster',{dias});
    }
    else if(req.body.page=='gaugemaster')
    {
      const gauges = await gaugemaster.find({Gauge:req.body.name});
      res.render('gaugemaster',{gauges});
    }
    else if(req.body.page=='fabricmaster')
    {
      const fabrics = await fabricmaster.find({FabricType:{$regex:(req.body.name).toUpperCase()}});
      res.render('fabricmaster',{fabrics});
   }
   else if(req.body.page=='yarnmaster')
   {
     const yarns = await yarnmaster.find({YarnCount:req.body.name});
     res.render('yarnmaster',{yarns});
   }
   else if(req.body.page=='millmaster')
   {
     const mills = await millmaster.find({Mill:{$regex:(req.body.name).toUpperCase()}});
     res.render('millmaster',{mills});
   }
   else if(req.body.page=='colormaster')
   {
     const colors = await colormaster.find({Color:{$regex:(req.body.name).toLowerCase()}});
     res.render('colormaster',{colors});
   }
   else if(req.body.page=='machinemaster'){
     const dias = await diamaster.find({});
     const gauges = await gaugemaster.find({});
     const machines = await machinemaster.find({MachineName:{$regex:(req.body.name).toUpperCase()}});
     res.render('machinemaster' ,{dias,gauges,machines});
   }

  }
  catch(error){
    res.send('No records found')
  }
}

exports.addDia = async(req,res) => {
  try{
    const newDia = new diamaster({
      Dia:req.body.dia,
      Status:'Active'
    });

    await newDia.save();

    res.redirect('dia');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addGauge = async(req,res) => {
  try{
    const newGauge = new gaugemaster({
      Gauge:req.body.gauge,
      Status:'Active'
    });

    await newGauge.save();

    res.redirect('gauge');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addFabric = async(req,res) => {
  try{
    const newFabric = new fabricmaster({
      FabricType:(req.body.fabric).toUpperCase(),
      Status:'Active'
    });

    await newFabric.save();

    res.redirect('fabric');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addYarn = async(req,res) => {
  try{
    const newYarn = new yarnmaster({
      YarnCount:req.body.yarn,
      Status:'Active'
    });

    await newYarn.save();

    res.redirect('yarn');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addColor = async(req,res) => {
  try{
    const newColor = new colormaster({
      Color:(req.body.color).toLowerCase(),
      Alternate:(req.body.alternate).toLowerCase(),
      Status:'Active'
    });

    await newColor.save();

    res.redirect('color');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addMill = async(req,res) => {
  try{
    const newMill = new millmaster({
      Mill:(req.body.mill).toUpperCase(),
      Status:'Active'
    });

    await newMill.save();

    res.redirect('mill');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addMachine = async(req,res) => {
  try{
    const newMachine = new machinemaster({
      MachineName:(req.body.name).toUpperCase()+"-"+req.body.dia+"Ø-"+req.body.gauge+"G.G",
      Name:(req.body.name).toUpperCase(),
      Dia:req.body.dia,
      Gauge:req.body.gauge,
      Status:'Active'
    })

    await newMachine.save();
    res.redirect('machine');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addTax = async(req,res) => {
  try{
    const total = Number(req.body.cgst)+Number(req.body.sgst)+Number(req.body.igst);
    const newTax = new taxmaster({
      TaxName:(req.body.tax).toUpperCase(),
      CGST:req.body.cgst,
      SGST:req.body.sgst,
      IGST:req.body.igst,
      Total:total,
      Status:'Active'
    })
    await newTax.save();
    res.redirect('tax');
  }
  catch(error){
    res.send('error occured');
  }
}

exports.addCompany = async
/*async function insertDummy(){
  try{
    await fabricmaster.insertMany([{"FabricType":24,"Status":"Active"}]);
  }
  catch(error){
    console.log(error);
  }
}

insertDummy();*/
