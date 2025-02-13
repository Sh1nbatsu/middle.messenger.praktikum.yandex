export default `
            <div id="input-div" {{#if special}} class="{{specialClass}}"{{/if}}>
              <p class="top__text">{{inputDesc}}</p>
              <input type="{{inputType}}" name="{{inputName}}" required/>
              <p class="bottom__text">{{errorMessage}}</p>
            </div>
`;
