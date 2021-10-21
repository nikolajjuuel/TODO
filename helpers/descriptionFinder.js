module.exports = {
  //searches wolframalpha api for description images
  descriptionFinder(info) {
    const howManyPods = Number(info.pods.length);
    const defaultImg3 = info.pods[1].subpods[0].img.src;
    if (howManyPods > 2) {
      for (let i = 0; i < howManyPods; i++) {
        let infoTitles = info.pods[i];
        if (infoTitles.title === 'Basic movie information') {
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Nutrition facts') {
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Basic properties') {
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Inventor') {
          return infoTitles.subpods[0].img.src;
        }
      }
    }
    return defaultImg3;
  }
}