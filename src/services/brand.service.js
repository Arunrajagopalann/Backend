const  brandModel = require('../models/masters/theme/brand.model')
const categoryConst = require('../utils/category.utils')
const productModel = require('../models/product/product.model')

  exports.createOrUpdateBrand = async (req,res) =>{
        let id= req.params.id;
        let data= req.body
        try{
            if(id){
                const category= await brandModel.findByIdAndUpdate(id,data)
                return { success: true, statusCode: 200, message: "brand update successfully" };
            }else{
                try{
                    data.status = categoryConst.categoryStatusActive
                    const category = new brandModel(data)
                    category.save()
                    return{success:true,statusCode: 200, message: " create brand successfully"}
                }
                catch(err){
                    return{success:false,statusCode: 500, message: "Could not brand Category" +err}
                }
            }
        }
        catch (err){
            return{success:false,statusCode: 500, message: "Could not brand Category"}
        }
  }


  exports.getAllBrand = async (req,res)=>{
    let id= req.params.id;
    try{
        if(id){
            let brand = await brandModel.findById(id)
            if (!brand) {
                return res.status(404).json({ success: false, statusCode: 404, message: "Brand not found" });
            }
            
            let products = await productModel.find({ brand: brand._id });

            
            return {  data: { ...brand._doc,  products: products},success: true, statusCode: 200, message: "data fetched successfully" };

        }else{
            // let brandData = await brandModel.aggregate([
            //     {$lookup:{
            //         from:'products',
            //         localField:'productId',
            //         foreignField:'_id',
            //         as:'products'
            //   }},
            // //   {$unwind:"$products"},
            // {$match:{"products.seller":"yoga"}}
    
            // ])

            const queryBrand = await brandModel.find({ status: { $ne: 'DELETED' }})
            // queryBrand[0].sayHi()
            // const queryBrands = await brandModel.findByName("addidas")
        //  
            
            return { data:queryBrand,success: true, statusCode: 200, message: "data fetched successfully" };
        }
    }
    catch (err){
            return{success:false,statusCode: 500, message: "Could not fetch brand" + err}
    }
  }

    exports.deletebrand = async (req,res)=>{
      let id= req.params.id;
      try{
          const brand =await brandModel.findByIdAndDelete(id)
          return {success: true, statusCode: 200, message: "brand deleted successfully" };
      }
      catch(err){
          return{success:false,statusCode: 500, message: "Could not delete Category"}
  
      }
    }