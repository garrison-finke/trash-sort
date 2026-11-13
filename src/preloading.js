function preloadFonts(scene) {
    scene.load.font('avenir_regular', 'assets/fonts/Avenir_Next_LT_Pro_Regular.otf', 'opentype');
    scene.load.font('avenir_demi', 'assets/fonts/Avenir_Next_LT_Pro_Demi.otf', 'opentype');
    scene.load.font('bodoni_regular', 'assets/fonts/BodoniModa_9pt-Regular.ttf', 'truetype');
    scene.load.font('bodoni_semibold', 'assets/fonts/BodoniModa_9pt-SemiBold.ttf', 'truetype');
}

function preloadTrash(scene) {
    let keys = [];
    let trash = import.meta.glob('../public/assets/trash/*.png');
    Object.entries(trash).forEach(([path]) => {
        let local = path.split('/').slice(2).join('/');
        let key = path.split('/').pop().replace('.png', '');
        scene.load.image(key, local);
        keys.push(key);
    });
    return keys;
}

function preloadBins(scene) {
    let bins = import.meta.glob('../public/assets/bins/*.png');
    Object.entries(bins).forEach(([path]) => {
        let local = path.split('/').slice(2).join('/');
        let key = path.split('/').pop().replace('.png', '-bin');
        scene.load.image(key, local);
    });
}

function preloadSound(scene) {
    let keys = [];
    let sounds = import.meta.glob('../public/assets/sound/*.mp3');
    Object.entries(sounds).forEach(([path]) => {
        let local = path.split('/').slice(2).join('/');
        let key = path.split('/').pop().replace('.mp3', '');
        scene.load.audio(key, local);
        keys.push(key);
    });
    return keys;
}

export {preloadFonts, preloadTrash, preloadBins, preloadSound};