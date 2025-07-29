  const  categoryModel = require('../models/category/category.model')
  const categoryConst = require('../utils/category.utils')

  exports.createOrUpdateCategory = async (req,res) =>{
        let id= req.params.id;
        let data= req.body
        try{
            if(id){
                const category= await categoryModel.findByIdAndUpdate(id,data)
                return { success: true, statusCode: 200, message: "category update successfully" };
            }else{
                try{
                    data.status = categoryConst.categoryStatusActive
                    const category = new categoryModel(data)
                    category.save()
                    return{success:true,statusCode: 200, message: " create Category successfully"}
                }
                catch(err){
                    return{success:false,statusCode: 500, message: "Could not create Category" +err}
                }
            }
        }
        catch (err){
            return{success:false,statusCode: 500, message: "Could not create Category"}
        }
  }

  exports.getAllCategory = async (req,res)=>{
    let id= req.params.id;
    try{
        if(id){
            const category = await categoryModel.findById(id)
            return { data:category,success: true, statusCode: 200, message: "data fetched successfully" };

        }else{
            const category =await categoryModel.aggregate([
                { $match : {status : {$ne :'INACTIVE'}}},
                {
                    $project: {
                        categoryName: 1,
                        status: 1,
                        createdBy: 1,
                        updatedBy: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                },
                    {
                        $sort: { createdAt:1 }
                    }
            ])
            return { data:category,success: true, statusCode: 200, message: "data fetched successfully" };
        }
    }
    catch (err){
            return{success:false,statusCode: 500, message: "Could not fetch Category" + err}
    }
  }
  
  exports.deleteCategory = async (req,res)=>{
    let id= req.params.id;
    try{
        const category =await categoryModel.findByIdAndDelete(id)
        return {success: true, statusCode: 200, message: "category deleted successfully" };
    }
    catch(err){
        return{success:false,statusCode: 500, message: "Could not delete Category"}

    }
  }

  exports.patchCategory = async (req,res) =>{
    let id= req.params.id;
    let status= req.body.status;
    try{
        if(status){
            let category = await categoryModel.findById(id);
            category.status = status
            category.save()
            return { success: true, statusCode: 200, message: "category status updated successfully" };
        }else{
            return { success: false, statusCode: 400, message: "status is required" };
        }
      
    }
    catch(err){
        console.log('err',err);
        return { success: false, statusCode: 500, message: "Could not status updated" };
    }
  }
