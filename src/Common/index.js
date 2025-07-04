const local="http://localhost:5000"
const production="http://silaihub-env.eba-t2cmsekn.ap-south-1.elasticbeanstalk.com"
const render="https://silai-hub.onrender.com"
const backendDomain=render;
const summaryApi={
    signUp:{
        url:`${backendDomain}/api/v1/auth/signup`,
        method:"post"
    },
    logIn:{
        url:`${backendDomain}/api/v1/auth/login`,
        method:"post"
    },
    google:{
        url:`${backendDomain}/api/v1/auth/google`,
        method:"post"
    },
    add_product:{
        url:`${backendDomain}/api/v1/admin/add_product`,
        method:"post"
    },
    get_product:{
        url:`${backendDomain}/api/v1/admin/get_product`,
        method:"get"
    },
    delete_product:{
        url:`${backendDomain}/api/v1/admin/delete_product`,
        method:"delete"
    },
    get_single_product:{
        url:`${backendDomain}/api/v1/common/get_single_product`,
        method:"get"
    },
    gel_all_product:{
        url:`${backendDomain}/api/v1/common/gel_all_product`,
        method:"get" 
    },
    cart:{
        url:`${backendDomain}/api/v1/user/cart`,
        method:"post" 
    },
    get_all_cart:{
        url:`${backendDomain}/api/v1/user/get_all_cart`,
        method:"get" 
    },
    delete_add_to_cart:{
        url:`${backendDomain}/api/v1/user/delete_add_to_cart`,
        method:"post" 
    },
    updateCartQuantity:{
        url:`${backendDomain}/api/v1/user/updateCartQuantity`,
        method:"post" 
    },
    update_product:{
        url:`${backendDomain}/api/v1/admin/update_product`,
        method:"post" 
    },
    get_feedback:{
        url:`${backendDomain}/api/v1/feedback/getAll`,
        method:"get"
    },
    add_feedback:{
        url:`${backendDomain}/api/v1/feedback/add`,
        method:"post"
    },
    update_feedback:{
        url:`${backendDomain}/api/v1/feedback/update`,
        method:"post"
    },
    delete_feedback:{
        url:`${backendDomain}/api/v1/feedback/delete`,
        method:"delete"
    },

}
export default summaryApi