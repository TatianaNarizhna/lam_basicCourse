import { Component } from 'react';
import PropTypes from 'prop-types';

class FormElement extends Component {
  state = {
    service: '',
    textField: '',
  };

  handleServiceChange = e => {
    this.setState({ service: e.currentTarget.value });
  };

  handleTextFieldChange = e => {
    this.setState({ textField: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="service">Послуга</label>
          <input
            list="services"
            id="service"
            name="service"
            value={this.state.service}
            onChange={this.handleServiceChange}
          />
          <datalist id="services">
            <option value="Переклад" />
            <option value="Редагування" />
          </datalist>

          <div>
            <textarea
              name="text"
              id=""
              cols="40"
              rows="10"
              placeholder="Введіть текст або загрузіть файл "
              value={this.state.textField}
              onChange={this.handleTextFieldChange}
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
}

//  function FormElement () {
//     return (
//         <div>
//             <form action="">
//                 <label htmlFor="service">Послуга</label>
//                 <input list= "services" id="service" name='service' />
//              <datalist id='services'>
//              <option value="Переклад"/>
//              <option value="Редагування"/>
//              </datalist>

//             </form>
//         </div>
//     )
// }

FormElement.propTypes = {};

export default FormElement;
