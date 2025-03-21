export default `
  <div class="pfpmodal-wrapper">
    <div class="pfpmodal-container">
      <form enctype="multipart/form-data">
        <p>Change profile picture</p>
        <div>
          <label for="file-upload" class="custom-file-upload">
            Select a file from this PC
          </label>
          <input id="file-upload" type="file" name="pfp-img"/>
        </div>
        {{{ MainButton }}}
      </form>
    </div>
  </div>
`;
