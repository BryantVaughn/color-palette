import React, { Component } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
      formShowing: false
    }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={ classes.root }>
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
              onClick={ this.props.handleDrawerOpen }
              className={ classNames(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              New Color Palette
            </Typography>
          </Toolbar>
          <div className={ classes.navBtns }>
            <Link to="/">
              <Button
                className={ classes.button }
                variant="contained"
                color="secondary"
              >
                Go Back
              </Button>
            </Link>
            <Button
              className={ classes.button }
              variant="contained"
              color="primary"
              onClick={ this.showForm }
            >
              Save
            </Button>
          </div>
        </AppBar>
        { formShowing && (
          <PaletteMetaForm
            palettes={ palettes }
            handleSubmit={ handleSubmit }
            hideForm={ this.hideForm }
          /> 
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);