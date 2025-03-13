export default `
            <div id="input-div"  class="edit__input-div">
              <p class="top__text">{{inputDesc}}</p>
              <input type="{{inputType}}" name="{{inputName}}"  placeholder="{{placeholder}}" {{#if required}} required {{/if}}/>
              <p class="bottom__text">{{errorMessage}}</p>
            </div>`;
