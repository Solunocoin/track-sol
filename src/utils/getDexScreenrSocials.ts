export async function getDexScreenerSocials(address: string) {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${address}`;
    const response = await fetch(url, {
        cache: 'no-cache',
      });
      const data: { pairs: DexScreenerPairType[] } = await response.json();
    
     let res : any = {}
     if(data.pairs.length > 0){
        data.pairs.forEach(pair => {
            let socials = pair.info.socials;
            if(socials){
                socials.forEach(social =>{
                    if(!(social.type in res)){
                            res[social.type] = social.url
                    } 
                }
                )           
            }
        });   
     }
  
     return res;  
}