/* eslint-disable max-len */
<template>
  <div class="equipment">
    <h1>My Astrophotography Rig</h1>
    <img
      class="equipment_img"
      :src="require('@/assets/about/gear.jpg')"
      alt="Astrophotography Rig"
    />
    <h1>Equipment</h1>
    <table class="styled-table">
      <tbody>
        <tr>
          <td>Optics</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://www.skywatcherusa.com/products/evostar-80ed"
                  target="_blank"
                  >Skywatcher Evostar 80ED (Refractor, 600mm f/7.5)</a
                >
              </li>
              <li>
                <a
                  href="https://www.meade.com/polaristm-127mm-reflector-telescope.html"
                  target="_blank"
                  >Meade Polaris 127MM (Reflector, 1000mm f/7.9)</a
                >
              </li>
              <li>
                <a
                  href="https://www.telescope.com/Orion/Orion-Mini-50mm-Guide-Scope/rc/2160/p/99607.uts"
                  target="_blank"
                  >Orion Mini 50mm Guide Scope (Refractor, 162mm f/3.2)</a
                >
              </li>
              <li>
                <a
                  :href="
                    'https://www.nikonusa.com/en/nikon-products/product/camera-lenses/' +
                    'af-s-dx-nikkor-18-300mm-f%252f3.5-5.6g-ed-vr.html'
                  "
                  target="_blank"
                  >Nikon AF-S DX NIKKOR ED VR (Lens, 18-300mm f/3.5-5.6)
                </a>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Filters</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://optcorp.com/products/optolong-l-pro-light-pollution-telescope-2-camera-filter"
                  target="_blank"
                  >Optolong L-Pro</a
                >
              </li>
              <li>
                <a
                  href="https://optcorp.com/products/radian-telescopes-2-inch-triad-ultra-filter"
                  target="_blank"
                  >Radian Triad Ultra Quad-Band Narrowband</a
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Cameras</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://www.nikonusa.com/en/nikon-products/product/dslr-cameras/d5500.html"
                  target="_blank"
                  >Nikon D5500 (Unmodified, 6000x4000, 3.89 µm, 23.5x15.6 mm)</a
                >
              </li>
              <li>
                <a
                  href="https://astronomy-imaging-camera.com/product/asi120mm-mini-mono"
                  target="_blank"
                  >ZWO ASI120MM Mini (Monochrome, 1280×960, 3.75µm,
                  4.8x3.6mm)</a
                >
              </li>
              <li>
                <a
                  href="https://www.ioptron.com/product-p/3339.htm"
                  target="_blank"
                  >iOptron iPolar (For polar alignment)</a
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Mounts</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://www.skywatcherusa.com/products/eq6-r-pro"
                  target="_blank"
                  >Skywatcher EQ6-R Pro</a
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Focal Reducers</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://www.skywatcherusa.com/products/reducer-corrector-85x-for-evostar-80"
                  target="_blank"
                  >Skywatcher Reducer/Corrector for Evostar 80 (.85x)</a
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Automation Accessories</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://pegasusastro.com/products/falcon-rotator/"
                  target="_blank"
                  >PegasusAstro Falcon Rotator</a
                >
              </li>
              <li>
                <a
                  href="https://pegasusastro.com/products/dmfc/"
                  target="_blank"
                  >PegasusAstro Dual Motor Focus Controller</a
                >
              </li>
              <li>
                <a
                  href="https://pegasusastro.com/motor-focus-kit/"
                  target="_blank"
                  >PegasusAstro Motor Focus Kit v2</a
                >
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Software</td>
          <td>
            <ul>
              <li>
                <a
                  href="https://sourceforge.net/projects/starnet/"
                  target="_blank"
                  >StarNet++</a
                >
              </li>
              <li>
                <a
                  href="https://www.adobe.com/products/photoshop.html"
                  target="_blank"
                  >Adobe Photoshop CC 2020</a
                >
              </li>
              <li>
                <a href="https://nighttime-imaging.eu/" target="_blank"
                  >N.I.N.A - Nighttime Imaging 'N' Astronomy</a
                >
              </li>
              <li>
                <a
                  href="http://deepskystacker.free.fr/english/index.html"
                  target="_blank"
                  >DeepSkyStacker</a
                >
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@media (max-width: 2100px) {
  .styled-table {
    font-size: 1.5em;
  }
}
@media (max-width: 1200px) {
  .styled-table {
    font-size: 1.25em;
  }
}
@media (max-width: 600px) {
  .styled-table {
    font-size: 1em;
  }
}

.styled-table {
  border-collapse: collapse;
  font-family: sans-serif;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.styled-table td {
  padding: 12px 15px;
}

.equipment_img {
  width: 75% !important;
  height: auto !important;
}
</style>
