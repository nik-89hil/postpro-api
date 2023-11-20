 const rootlibrary = ["mongodb", "javascript", "html", "css", "bootstrap", "api" ,"react", "express","server"]


 const searcher = {

    root_finder: function (str){
        let findarr = str.split(" ")
        for (let i = 0; i < findarr.length; i++) {
            for (let j = 0; j < rootlibrary.length; j++) {
                if(findarr[i] == rootlibrary[j]){
                    return findarr[i]
                }
            }
    
        }
        return "nothing found"

    },

    recordfound: function(arr,str){  // db,string to be searched
        const records = [];
        const chk = this.root_finder(str);
        for(let i=0; i<arr.length;i++){
            const dbtag = arr[i].tags
            // console.log(dbtag)
            for(let j = 0;j<dbtag.length;j++){
                if(dbtag[j] == chk) {
                    records.push(arr[i]) 
                }
            }
        }
        // console.log(records,"--searcher")
        return records
    
    }


}

module.exports = {
    rootlibrary,
    searcher,
};