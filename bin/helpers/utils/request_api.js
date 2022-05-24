// const rp = require('request-promise');

// const reqGet = async(url, basic = null, params = null)=>{
//   // eslint-disable-next-line no-console
//   // const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   try{
//     let option = {
//       method : 'GET',
//       uri : url,
//       json : true,
//       // headers : {
//       //   'Authorization': auth
//       // },
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.qs = params;
//     let body = await rp.get(option);
//     return body;
//   } catch (e) {
//     return { err: e.error };
//   }
// };

// const reqGetDownload = async(url, basic = null, params = null)=>{
//   const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   const fileName = params.fileName;
//   try{
//     let option = {
//       method : 'GET',
//       uri : url+`${fileName}`,
//       json : true,
//       formData: {
//         fileName : fileName
//       },
//       headers : {
//         'Authorization': auth
//       },
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.qs = params;

//     let body = await rp.get(option);

//     return body;
//   } catch (e) {
//     return { err: e.error };
//   }
// };

// const reqGetCourseByCategories = async(url, basic = null, params = null)=>{
//   const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   const value = params.value;
//   try{
//     let option = {
//       method : 'GET',
//       uri : url+`${value}`,
//       json : true,
//       headers : {
//         'Authorization': auth
//       },
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.qs = params;

//     let body = await rp.get(option);

//     return body;
//   } catch (e) {
//     return { err: e.error };
//   }
// };

// const reqGetCourseContent = async(url, basic = null, params = null)=>{
//   const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   const value = params.value;
//   try{
//     let option = {
//       method : 'GET',
//       uri : url+`${value}`,
//       json : true,
//       headers : {
//         'Authorization': auth
//       },
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.qs = params;

//     let body = await rp.get(option);

//     return body;
//   } catch (e) {
//     return { err: e.error };
//   }
// };

// const reqGetDownloadLessonSchedule = async(url, basic = null, params = null)=>{
//   const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   const scheduleId = params.scheduleId;
//   try{
//     let option = {
//       method : 'GET',
//       uri : url+`${scheduleId}`,
//       json : true,
//       headers : {
//         'Authorization': auth
//       }
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.qs = params;

//     let body = await rp.get(option);

//     return body;
//   }catch (e){
//     return { err: e.error };
//   }
// };

// const reqPost = async(url, access_token =null, bodyParam = null)=>{

//   try{
//     let option = {
//       method : 'POST',
//       uri : url,
//       json : true,
//       headers : {
//         'User-Agent': 'Request-Promise'
//       }
//     };
//     if(access_token !== null)
//       option.headers = {
//         'accesstoken' : access_token,
//       };
//     if(bodyParam !== null) {
//       option.form = bodyParam;
//     }

//     let body = await rp.post(option);
//     return body;
//   }catch (e){
//     return { err: e.error };
//   }
// };

// const reqPostNew = async(url, basic = null, params = null)=>{
//   const auth = 'Basic ' + Buffer.from(basic[0].username + ':' + basic[0].password).toString('base64');
//   try{
//     let option = {
//       method : 'POST',
//       uri : url,
//       json : true,
//       headers : {
//         'Authorization': auth
//       },
//     };
//     if(basic !== null)
//       option.headers['accesstoken'] = basic;
//     if(params !== null)
//       option.form = params;

//     let body = await rp.post(option);

//     return body;
//   } catch (e) {
//     return { err: e.error };
//   }
// };

// module.exports = {
//   reqGet,
//   reqPost,
//   reqPostNew,
//   reqGetDownload,
//   reqGetDownloadLessonSchedule,
//   reqGetCourseByCategories,
//   reqGetCourseContent
// };
