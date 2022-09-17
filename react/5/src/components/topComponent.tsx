import React, {
  FunctionComponent,
  ReactNode,
  RefObject,
  ForwardedRef,
  useEffect,
} from "react";
import ButtonComponent from "./buttonComponent";
import "../style/top.css";
interface PropType {
  children?: ReactNode;
  onClick?: Function;
  color?: string;
  scrollElement?: RefObject<HTMLDivElement>;
}
const TopButtonComponent = React.forwardRef((props: PropType, ref: ForwardedRef<HTMLButtonElement>) => {
    const svgRef: RefObject<SVGSVGElement> = React.createRef();
    const setPathElementFill = (paths: HTMLCollection, color: string) => {
      if (paths) {
        Array.from(paths).forEach((path) => path.setAttribute("fill", color));
      }
    };
    const onMouseEnterHandler = () => {
      const svgPaths = svgRef?.current?.children;
      if (svgPaths) {
        setPathElementFill(svgPaths, "#2396ef");
      }
    };
    const onMouseLeaveHandler = () => {
      const svgPaths = svgRef?.current?.children;
      if (svgPaths) {
        setPathElementFill(svgPaths, "#ffffff");
      }
    };
    const onTopHandler = () => {
      props.onClick && props.onClick();
    };
    return (
      <ButtonComponent
        onClick={onTopHandler.bind(this)}
        className="to-Top-btn btn-no-hover btn-no-active"
        size="mini"
        forwardedRef={ref}
      >
        {props.children ? ( props.children) : (
          <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4158"
            onMouseEnter={onMouseEnterHandler.bind(this)}
            onMouseLeave={onMouseLeaveHandler.bind(this)}
            ref={svgRef}
          >
            <path
              d="M508.214279 842.84615l34.71157 0c0 0 134.952598-188.651614 134.952598-390.030088 0-201.376427-102.047164-339.759147-118.283963-357.387643-12.227486-13.254885-51.380204-33.038464-51.380204-33.038464s-37.809117 14.878872-51.379181 33.038464C443.247638 113.586988 338.550111 251.439636 338.550111 452.816063c0 201.378473 134.952598 390.030088 134.952598 390.030088L508.214279 842.84615zM457.26591 164.188456l50.948369 0 50.949392 0c9.344832 0 16.916275 7.522324 16.916275 16.966417 0 9.377578-7.688099 16.966417-16.916275 16.966417l-50.949392 0-50.948369 0c-9.344832 0-16.917298-7.556093-16.917298-16.966417C440.347588 171.776272 448.036711 164.188456 457.26591 164.188456zM440.347588 333.852624c0-37.47859 30.387078-67.865667 67.865667-67.865667s67.865667 30.387078 67.865667 67.865667-30.387078 67.865667-67.865667 67.865667S440.347588 371.331213 440.347588 333.852624z"
              p-id="4159"
              fill={props.color}
            ></path>
            <path
              d="M460.214055 859.812567c-1.87265 5.300726-2.90005 11.000542-2.90005 16.966417 0 12.623505 4.606925 24.189935 12.244882 33.103956l21.903869 37.510312c1.325182 8.052396 8.317433 14.216793 16.750499 14.216793 8.135284 0 14.929014-5.732561 16.585747-13.386892l0.398066 0 24.62177-42.117237c5.848195-8.284687 9.29469-18.425651 9.29469-29.325909 0-5.965875-1.027399-11.665691-2.90005-16.966417L460.214055 859.81359z"
              p-id="4160"
              fill={props.color}
            ></path>
            <path
              d="M312.354496 646.604674c-18.358113 3.809769-28.697599 21.439288-23.246447 39.399335l54.610782 179.871647c3.114944 10.304693 10.918677 19.086707 20.529569 24.454972l8.036024-99.843986c1.193175-14.745842 11.432377-29.226648 24.737404-36.517705-16.502859-31.912827-34.381042-71.079872-49.375547-114.721835L312.354496 646.604674z"
              p-id="4161"
              fill={props.color}
            ></path>
            <path
              d="M711.644481 646.604674l-35.290761-7.356548c-14.994506 43.641963-32.889061 82.810031-49.374524 114.721835 13.304004 7.291057 23.544229 21.770839 24.737404 36.517705l8.036024 99.843986c9.609869-5.368264 17.397229-14.150278 20.529569-24.454972L734.890928 686.004009C740.34208 668.043962 730.003618 650.414443 711.644481 646.604674z"
              p-id="4162"
              fill={props.color}
            ></path>
          </svg>
        )}
      </ButtonComponent>
    );
  }
);
const TopComponent: FunctionComponent<PropType> = (props: PropType) => {
  const btnRef: RefObject<HTMLButtonElement> = React.createRef();
  let scrollElement: null | HTMLElement = null;
  let top_value: number = 0,timer: NodeJS.Timeout | null = null;
  const updateTop = () => {
        top_value -= 20;
        scrollElement && (scrollElement.scrollTop = top_value);
        if (top_value < 0) {
            if (timer) clearTimeout(timer);
            scrollElement && (scrollElement.scrollTop = 0);
            btnRef.current && ((btnRef.current as HTMLButtonElement).style.display = "none");
        } else {
            timer = setTimeout(updateTop, 1);
        }
  };
  const topHandler = () => {
        scrollElement = props.scrollElement?.current || document.body;
        top_value = scrollElement.scrollTop;
        updateTop();
        props.onClick && props.onClick();
  };
  useEffect(() => {
    const scrollElement = props.scrollElement?.current || document.body;
    // listening the scroll event
    scrollElement && scrollElement.addEventListener("scroll", (e: Event) => {
        const { scrollTop } = e.target as HTMLDivElement;
        if (btnRef.current) {
          (btnRef.current as HTMLButtonElement).style.display = scrollTop > 50 ? "block" : "none";
        }
    });
  });
  return (<TopButtonComponent ref={btnRef} {...props} onClick={topHandler.bind(this)}></TopButtonComponent>);
};
export default TopComponent;
