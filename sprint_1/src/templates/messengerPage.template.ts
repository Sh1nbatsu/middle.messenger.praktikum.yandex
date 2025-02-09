export default `
    <div class="messenger__wrapper">
      <div class="navigation__wrapper">
        <div class="profile-link">
          <a href="/profile">Profile<img src="../static/arrow_gray.svg" alt=""></a>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Search">
          <img src="../static/search_icon.svg" alt="">
        </div>
        <div class="chat-select__wrapper">
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Andrew" lastData="Image" lastTime="12:24" unreadAmount="1"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount=0}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="../static/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
        </div>
      </div>
      <div class="chat__wrapper"></div>
    </div>
`

{{!-- ПОФИКСИТЬ HOVER НА CHAT ITEM PARTIAL, PADDING У NAVIG WRAPPER --}}