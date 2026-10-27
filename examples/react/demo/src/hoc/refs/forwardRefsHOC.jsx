import React from "react";

// hoc
// function logProps(WrappedComponent) {
//   class LogProps extends React.Component {
//     componentDidUpdate(prevProps) {
//       console.log("old props:", prevProps);
//       console.log("new props:", this.props);
//     }

//     render() {
//       const { forwardRef, ...reset } = this.props;
//       // 拦截了ref prop
//       return <WrappedComponent ref={forwardRef} {...reset} />;
//     }
//   }

//   //   转发refs
//   return React.forwardRef((props, ref) => (
//     <LogProps {...props} forwardRef={ref} />
//   ));
// }

function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// component
// class FancyButton extends React.Component {
//   state = {
//     name: "FancyButton",
//   };
//   focus() {
//     alert("focus");
//   }

//   componentDidMount() {
//     console.log(this.props);
//   }

//   render() {
//     const { label } = this.props;

//     return (
//       <div>
//         <button onClick={this.focus.bind(this)}>{label}</button>
//       </div>
//     );
//   }
// }

function FancyButton(props, ref) {
  const { label } = props;
  return <button ref={ref}>{label}</button>;
}

export default logProps(FancyButton);
