export default `
    <div class="messenger__wrapper">
      <div class="navigation__wrapper">
        <div class="profile-link">
          <a href="/profile">Profile<img src="/arrow_gray.svg" alt=""></a>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Search" name="chat_search">
          <img src="/search_icon.svg" alt="">
        </div>
        <div class="chat-select__wrapper">
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Andrew" lastData="Image" lastTime="12:24" unreadAmount=1}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount=0}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
          {{> chatItemPartial pfpUrl="/mock_pfp2.jpg" chatName="Wakizashi" youSend=true lastData="Image;glkl;skl;sdfksdl;fklsdf;ksdl;fkl;sdfsdf;kl" lastTime="12:24" unreadAmount="12"}}
        </div>
      </div>
        <div class="chat-main">
          <div class="top-block">
            <div>
              <img src="/mock_pfp2.jpg" alt="">
              <p>Onryo</p>  
            </div>
              <img src="/three_dots.svg" alt="">
          </div>
          <div class="messages">
            <div class="date">19 July</div>
            <div class="message">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, incidunt, at saepe quasi suscipit culpa amet eum cupiditate accusamus voluptate quibusdam! Quae, totam error. Maiores quae, culpa tenetur voluptate ipsum modi mollitia unde animi fuga esse impedit facere quod nisi cupiditate quos molestias dicta a corrupti iure explicabo odit. Magnam beatae at excepturi blanditiis vero obcaecati molestiae sapiente, distinctio veniam, tempore, cum nam modi ex perferendis sint. Consequatur, quaerat. Laboriosam consequatur mollitia eos cum, laborum consectetur odio sequi nulla fugiat deserunt, delectus, qui aspernatur. Autem vel debitis, iste laborum dolore laboriosam quaerat qui deleniti voluptas blanditiis, illum mollitia ex inventore sunt vero facilis eaque a! Voluptate amet, illo animi enim accusamus repellat, dolorum dolor labore maiores nobis veniam maxime. Quis, quisquam praesentium.</p>
              <p class="message-date">13:37</p>
            </div>
            <div class="sent-message">
              <p>Nice bro, very good</p>
              <p class="message-date">13:38</p>
            </div>
            <div class="message">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, incidunt, at saepe quasi suscipit culpa amet eum cupiditate accusamus voluptate quibusdam! Quae, totam error. Maiores quae, culpa tenetur voluptate ipsum modi mollitia unde animi fuga esse impedit facere quod nisi cupiditate quos molestias dicta a corrupti iure explicabo odit. Magnam beatae at excepturi blanditiis vero obcaecati molestiae sapiente, distinctio veniam, tempore, cum nam modi ex perferendis sint. Consequatur, quaerat. Laboriosam consequatur mollitia eos cum, laborum consectetur odio sequi nulla fugiat deserunt, delectus, qui aspernatur. Autem vel debitis, iste laborum dolore laboriosam quaerat qui deleniti voluptas blanditiis, illum mollitia ex inventore sunt vero facilis eaque a! Voluptate amet, illo animi enim accusamus repellat, dolorum dolor labore maiores nobis veniam maxime. Quis, quisquam praesentium.</p>
              <p class="message-date">13:37</p>
            </div>
            <div class="message">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, incidunt, at saepe quasi suscipit culpa amet eum cupiditate accusamus voluptate quibusdam! Quae, totam error. Maiores quae, culpa tenetur voluptate ipsum modi mollitia unde animi fuga esse impedit facere quod nisi cupiditate quos molestias dicta a corrupti iure explicabo odit. Magnam beatae at excepturi blanditiis vero obcaecati molestiae sapiente, distinctio veniam, tempore, cum nam modi ex perferendis sint. Consequatur, quaerat. Laboriosam consequatur mollitia eos cum, laborum consectetur odio sequi nulla fugiat deserunt, delectus, qui aspernatur. Autem vel debitis, iste laborum dolore laboriosam quaerat qui deleniti voluptas blanditiis, illum mollitia ex inventore sunt vero facilis eaque a! Voluptate amet, illo animi enim accusamus repellat, dolorum dolor labore maiores nobis veniam maxime. Quis, quisquam praesentium.</p>
              <p class="message-date">13:37</p>
            </div>
          </div>
          <div class="bottom-block">
            <form action="">
              <img src="/chat_attachment.svg" alt="">
              <input type="text" placeholder="Message">
              <button>
                <img src="/arrow.svg" alt="">
              </button>
            </form>
          </div>
        </div>
    </div>`;
