function reduceSocials(socials: DesxScreenerSocials[]): Record<string, string> {
  
  return socials.reduce((acc: Record<string, string>, link: DesxScreenerSocials) => {
     
      // Always update the type key with the current link's URL
      acc[link.type] = link.url;
      return acc;
    }, {} as Record<string, string>);  // Explicitly type the initial value of the accumulator as Record<string, string>
  }

export default reduceSocials
