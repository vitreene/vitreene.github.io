export default function HeroVideoStop() {
    const postHero = document.getElementById('post-hero-video-wrapper');
    (postHero) && postHero.addEventListener('mousedown', videoPause);
}

function videoPause(evt) {
    evt.stopPropagation();
    const phv = document.getElementById('post-hero-video');
    phv.pause();
    phv.classList.add('post-hero-video-pause');
}
