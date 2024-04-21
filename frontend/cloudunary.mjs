import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: "morive", // add your cloud_name
    api_key: "125585437432199", // add your api_key
    api_secret: "HiNB_hONWK5ZgyWeTaUecJatn_s", // add your api_secret
    secure: true
});

cloudinary.v2.api.resources({
    type: 'upload',
    prefix: 'luismena/home',
    max_results: 100,
},
    function (error, result) { console.log(result, error) });