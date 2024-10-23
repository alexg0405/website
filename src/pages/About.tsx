import BostonView from "../components/BostonView";
import { useFadeIn } from "../hooks/useFadeIn";
import "./About.css";

const About: React.FC = () => {
  const fadeIn = useFadeIn();

  return (
    <div className={`about fade-in ${fadeIn ? "show" : ""}`}>
      <div className="overlay" />
      <div className="boston-view">
        <BostonView />
      </div>
      <div className="content">
        <div className="box">
          <div className="box-content">
            <h2 className="box-title">Box 1 Title</h2>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Aliquet ac
              laoreet etiam libero auctor lacus quisque auctor consequat.
              Finibus semper ridiculus bibendum felis sem gravida. Fames id
              dignissim nam molestie netus adipiscing aenean magnis. Dapibus
              quisque pharetra mus tortor, amet libero mi hendrerit. Facilisis
              sed taciti et; odio duis lobortis donec. Diam suspendisse nulla
              faucibus potenti potenti placerat interdum in. Morbi id luctus
              metus rhoncus suspendisse elit. Per ligula facilisis pulvinar
              proin himenaeos. Mattis sed justo facilisi conubia netus nulla
              porta ut nostra. Augue quam eleifend facilisi euismod vehicula.
              Ridiculus interdum metus tellus nascetur nascetur dignissim. Nam
              dolor congue purus phasellus eros primis. Vestibulum diam aliquam
              natoque viverra malesuada penatibus eros tellus. Dui vel magna
              iaculis phasellus quisque. Mattis ad hendrerit id convallis curae
              montes cubilia magnis. Euismod ultrices vehicula convallis odio
              sem leo. Vivamus turpis accumsan elit platea metus. Ridiculus duis
              eget condimentum fringilla etiam pulvinar class habitant. Turpis
              fames iaculis ad; mollis blandit interdum tempus. Habitant est
              curae torquent, magna sollicitudin molestie sollicitudin. Lorem
              etiam phasellus vehicula potenti mollis velit himenaeos. Senectus
              porta tempus litora metus sagittis convallis taciti. Nam urna
              suscipit netus erat taciti nostra congue. Sollicitudin posuere
              hendrerit sodales maecenas sed ultricies. Leo lectus arcu vitae
              platea purus semper donec laoreet cubilia. Lectus at accumsan
              sodales eros fermentum feugiat vestibulum montes fusce. Vitae
              quisque efficitur nullam ipsum donec convallis taciti auctor?
              Imperdiet iaculis dictum amet suspendisse dapibus dui eget risus.
              Auctor aliquam vitae consectetur lobortis donec cubilia taciti
              sollicitudin massa.
            </p>
            <p>
              Magnis orci velit fermentum metus at facilisis morbi. Elementum
              habitant rutrum conubia donec dictum enim pellentesque massa
              fames. Ultricies finibus rhoncus duis torquent ligula. Enim purus
              phasellus sem, amet montes habitasse. Libero semper viverra
              tortor; blandit rutrum taciti! Sem conubia porttitor commodo
              turpis fringilla sapien cras cubilia. Velit per sociosqu mattis
              lacus amet volutpat per id. Himenaeos eros litora magna; habitant
              egestas elit sit semper. Amet eros blandit aliquet purus rhoncus
              cubilia. Curabitur velit litora sociosqu tristique dictumst
              condimentum pellentesque blandit. Morbi enim nisl netus; curabitur
              venenatis tincidunt ex dictum. Duis nullam volutpat justo
              dictumst; blandit nulla volutpat dictum. Euismod in non vitae
              faucibus eu non eros amet. Tellus per habitasse conubia; inceptos
              morbi litora aliquet. Volutpat fringilla et amet dapibus magna
              ipsum iaculis malesuada. Cras justo ornare montes cras posuere
              semper felis rutrum vel. Aplacerat suscipit; sem lacinia faucibus
              enim consectetur. Mauris ante ligula viverra dapibus cubilia
              lobortis ligula elementum. Tristique dui venenatis molestie diam,
              dapibus varius commodo euismod! Vestibulum porttitor himenaeos
              hendrerit efficitur sollicitudin aptent tempor etiam. Vehicula
              magna nascetur aptent vel placerat curabitur congue orci.
              Curabitur feugiat parturient massa nulla integer venenatis magnis.
              Aenean ridiculus aliquam sem finibus tempor. Molestie litora
              placerat platea etiam, torquent ac facilisi iaculis. Ut penatibus
              inceptos nisl; sem sed adipiscing? Vehicula id lacinia rutrum
              imperdiet nisl accumsan. Ultricies risus integer vestibulum
              condimentum, ante odio. Facilisi euismod porta scelerisque nibh
              mattis nec lectus risus mattis. Volutpat cras ex etiam, nam ex
              tincidunt ante morbi ultricies.
            </p>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <h2 className="box-title">Box 2 Title</h2>
            <p>
              Phasellus tristique magna velit erat; ligula odio gravida mi.
              Magnis fringilla dis maecenas egestas egestas. Congue potenti
              viverra ultricies, aenean semper iaculis. Blandit orci curabitur
              eros phasellus sem molestie diam. Neque senectus dapibus luctus
              justo risus curabitur nostra. Adipiscing quisque iaculis libero
              ullamcorper phasellus sapien ac per. Hendrerit dis purus pretium
              quis consectetur. Dis semper hac velit, mollis parturient netus.
            </p>
            <p>
              Pellentesque pretium habitant ligula pulvinar tincidunt nulla
              magna orci nisi. Quis aliquam quam, venenatis accumsan lacinia
              maecenas mi. Facilisis duis justo pretium erat tempus senectus.
              Purus mauris erat malesuada habitant dis quam taciti. Aenean
              condimentum viverra dui risus mollis. Vestibulum posuere eget
              parturient mus diam feugiat rhoncus aenean. Himenaeos magnis lacus
              sodales vehicula aptent. Venenatis vehicula etiam mauris mollis
              ligula risus consequat hac.
            </p>
            <p>
              Pretium eros montes curae penatibus mauris. Lacus eleifend
              consequat auctor posuere; eget viverra. Phasellus est aptent
              semper vel vehicula ultrices. Nam placerat dictum proin
              consectetur tempor, velit habitasse. Cubilia libero viverra turpis
              efficitur; praesent arcu justo. Placerat feugiat vulputate
              ullamcorper massa molestie praesent primis. Ultricies metus nisl
              penatibus mattis aptent eros iaculis ullamcorper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
