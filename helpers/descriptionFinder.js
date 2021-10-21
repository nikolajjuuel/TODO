module.exports = {
  descriptionFinder(info) {
    const howManyPods = Number(info.pods.length);

    const defaultImg3 = info.pods[1].subpods[0].img.src;
    if (howManyPods > 2) {
      for (let i = 0; i < howManyPods; i++) {
        let infoTitles = info.pods[i];
        //console.log('answers titles:',answerTitles.title);
        if (infoTitles.title === 'Basic movie information') {
          //console.log('subpods',answerTitles.subpods[0].img.src)
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Nutrition facts') {
          //console.log('subpods',answerTitles.subpods[0].img.src)
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Basic properties') {
          //console.log('subpods',answerTitles.subpods[0].img.src)
          return infoTitles.subpods[0].img.src;
        }
        if (infoTitles.title === 'Inventor') {
          //console.log('subpods',answerTitles.subpods[0].img.src)
          return infoTitles.subpods[0].img.src;
        }
      }
    }
    return defaultImg3;
  }
}