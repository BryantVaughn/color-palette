import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: "teal",
      colors: [{color: "blue", name: "blue"}],
      newColorName: "",
      newPaletteName: ""
    };
  }

  componentDidMount = () => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => 
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) => 
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !==
      value.toLowerCase()
      )
    );
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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
    let newName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  };

  removeColor = colorName => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes } = this.props;
    const { open, colors, currentColor, newPaletteName, newColorName } = this.state;

    return (
      <div className={ classes.root }>
        <CssBaseline />
        <AppBar
          postion="fixed"
          color="default"
          className={ classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={ !open }>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={ this.handleDrawerOpen }
              className={
                classNames(classes.menuButton, open && classes.hide )
              }
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              New Color Palette
            </Typography>
            <ValidatorForm onSubmit={ this.handleSubmit }>
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={ newPaletteName }
                onChange={ this.handleChange }
                validators={ ["required", "isPaletteNameUnique"] }
                errorMessages={ ["Palette name required", "Name already used"] }
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={ classes.drawer }
          variant="persistent"
          anchor="left"
          open={ open }
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={ classes.drawerHeader }>
            <IconButton onClick={ this.handleDrawerClose }>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">
            Design Your Palette
          </Typography>
          <div>
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <ChromePicker
            color={ currentColor }
            onChangeComplete={ this.updateCurrentColor }
          />
          <ValidatorForm onSubmit={ this.addNewColor } instantValidate={ false }>
            <TextValidator
              value={ newColorName }
              name="newColorName"
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
              variant="contained"
              type="submit"
              color="primary"
              style={{ backgroundColor: currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={ classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={ classes.drawerHeader } />
          <DraggableColorList
            colors={ colors }
            removeColor={ this.removeColor }
            axis="xy"
            onSortEnd={ this.onSortEnd }
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);