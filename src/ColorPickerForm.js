import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px",

  }
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      newColorName: ""
    };
  }

  componentDidMount = () => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => 
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) => 
      this.props.colors.every(
        ({ color }) => color !== value.currentColor
      )
    );
  };

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;

    return (
      <div>
        <ChromePicker
            color={ currentColor }
            onChangeComplete={ this.updateCurrentColor }
            className={ classes.picker }
          />
          <ValidatorForm onSubmit={ this.handleSubmit } instantValidate={ false }>
            <TextValidator
              className={ classes.colorNameInput }
              placeholder="Color Name"
              value={ newColorName }
              name="newColorName"
              variant="filled"
              margin="normal"
              onChange={ this.handleChange }
              validators={[
                "required",
                "isColorNameUnique",
                "isColorUnique"
              ]}
              errorMessages={[
                "color name is required",
                "color name must be unique",
                "color already used"
              ]}
            />
            <Button
            className={ classes.addColor }
              variant="contained"
              type="submit"
              color="primary"
              disabled={ paletteIsFull }
              style={{
                backgroundColor: paletteIsFull
                ? "rgba(0,0,0,0.12)"
                : currentColor
              }}
            >
              { paletteIsFull ? "Palette Full" : "Add Color" }
            </Button>
          </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);