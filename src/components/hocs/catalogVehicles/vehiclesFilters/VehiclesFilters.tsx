/* eslint-disable no-unused-vars */
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import { ReactComponent as Search } from "@ecommerce-ozon/design_system/dist/public/static/icons/search.svg";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-circle.svg";
import { ReactComponent as Calendar } from "@ecommerce-ozon/design_system/dist/public/static/icons/date.svg";
import { ReactComponent as Motorcycle } from "@ecommerce-ozon/design_system/dist/public/static/icons/motorcycle.svg";
import { ReactComponent as SpeedMeter } from "@ecommerce-ozon/design_system/dist/public/static/icons/speedometer.svg";
import { ReactComponent as Ticket } from "@ecommerce-ozon/design_system/dist/public/static/icons/price-tag-rotate.svg";
import { ReactComponent as SortFilter } from "@ecommerce-ozon/design_system/dist/public/static/icons/filter-descending.svg";
import { VehiclesFilters as VehiclesFiltersType } from "helpers/fetchVehicles";
import "./styles.scss";
import useVehicles from "hooks/useVehicles";
import { Modal, Input, Button } from "@ecommerce-ozon/design_system";
import { FilterFormValues } from "../Catalogo";

interface Props {
  selectFilters: Partial<VehiclesFiltersType>;
  fillForm: (
    prop: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  filterEnabled: boolean;
  resetVehicles: () => void;
  clearFilters: () => void;
  filterVehicles: () => void;
  filterForm: FilterFormValues;
}

interface InputProps {
  selectFilters: Partial<VehiclesFiltersType>;
  fillForm: (
    prop: string,
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  kms: number[];
  filterForm: FilterFormValues;
}

const VehiclesFiltersInputs: FC<InputProps> = ({
  selectFilters,
  fillForm,
  kms,
  filterForm,
}) => (
  <>
    <Input
      className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
      title="Año"
      type="select"
      icon={<Calendar />}
      name="year"
      // onChange={(e) => fillForm("year", e)}
      value={filterForm.year}
      options={[
        {
          label: "Selecciona año",
          value: "",
        },
      ].concat(
        selectFilters?.years ? selectFilters?.years?.map((y) => ({
          label: y.toString(),
          value: y.toString(),
        })) : []
      )}
    />
    <Input
      className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
      title="Cilindraje"
      type="select"
      icon={<Motorcycle />}
      name="cylinder"
      // onChange={(e) => fillForm("cylinder", e)}
      value={filterForm.cylinder}
      options={[
        {
          label: "Selecciona cilindraje",
          value: "",
        },
      ].concat(
        selectFilters?.cylinder_Capacities ? selectFilters?.cylinder_Capacities?.map((c) => ({
          label: c.toString(),
          value: c.toString(),
        })) : []
      )}
    />
    <Input
      className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
      title="Kilometraje  hasta"
      type="select"
      icon={<SpeedMeter />}
      name="kmTo"
      // onChange={(e) => fillForm("kmTo", e)}
      value={filterForm.kmTo}
      options={[
        {
          label: "Selecciona Km",
          value: "",
        },
      ].concat(
        kms?.map((km) => ({ label: km.toString(), value: km.toString() }))
      )}
    />
    <Input
      className="m_r_xxxl_desktop w_100_per_mobile flex_grow_1"
      title="Marca"
      type="select"
      icon={<Ticket />}
      name="brand"
      // onChange={(e) => fillForm("brand", e)}
      value={filterForm.brand}
      options={[
        {
          label: "Selecciona marca",
          value: "",
        },
      ].concat(
        selectFilters?.brands ? selectFilters?.brands?.map((b) => ({
          label: b.toString(),
          value: b.toString(),
        })) : []
      )}
    />
  </>
);

const KM_RANGES = _.range(0, 5001, 500);

const VehiclesFilters: FC<Props> = ({
  selectFilters,
  fillForm,
  filterEnabled,
  resetVehicles,
  filterVehicles,
  clearFilters,
  filterForm,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [kms, setKms] = useState<number[]>(KM_RANGES);
  const [modalOpen, setModalOpen] = useState(false);

  const prevScroll = useRef(window.pageYOffset);

  const {
    loading: vehiclesLoading,
    error: vehiclesError,
    data: { vehicles },
  } = useVehicles();
  const checkSticky = useCallback((e) => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop >= 10);
    setIsShow(prevScroll.current >= scrollTop);
    prevScroll.current = scrollTop;
  }, []);
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", checkSticky);
    return () => {
      window.removeEventListener("scroll", checkSticky);
    };
  });

  return (
    <div
      className={`vehicles-filters-container ${
        isSticky ? "sticky bg_neutral_200 p_x_xxxl" : ""
      } ${isShow ? "show" : `${isSticky ? "hide" : ""}`}`}
    >
      <div className="display_flex search-container">
        <Input
          className="m_r_xxxl_desktop m_r_xs_mobile w_100_per_mobile flex_grow_1"
          title=""
          name="text"
          placeholder="Busqueda"
          value={filterForm.text}
          type="text"
          onChange={(e) => fillForm("text", e)}
        />
        <Button
          icon={<Search className="m_l_xs" />}
          className="search-button p_x_lg p_y_md m_t_md"
          scale="small"
          onClick={() => (filterEnabled ? filterVehicles() : resetVehicles())}
        >
          {" "}
        </Button>
      </div>
      <div className="display_flex  flex_align_center flex_col_mobile ">
        <div className="display_flex flex_grow_1 display_none_mobile">
          <VehiclesFiltersInputs
            filterForm={filterForm}
            selectFilters={selectFilters}
            fillForm={fillForm}
            kms={kms}
          />
        </div>
        <Button
          className="p_x_xxxl m_t_lg w_100_per_mobile display_none_mobile"
          scale="small"
          icon={<SortFilter />}
          onClick={() => (filterEnabled ? filterVehicles() : resetVehicles())}
        >
          Filtrar
        </Button>
        {filterEnabled ? (
          <>
            <Button
              className="p_x_xxxl  m_b_xl_mobile w_100_per_mobile display_none_desktop"
              scale="small"
              icon={<SortFilter />}
              onClick={() => setModalOpen(true)}
            >
              Filtros Activos
            </Button>
            <Button
              className="p_x_xxxl  m_b_xl_mobile w_100_per_mobile display_none_desktop text_primary_300"
              variant="link"
              scale="small"
              icon={<Close />}
              onClick={clearFilters}
            >
              Limpiar Filtros
            </Button>
          </>
        ) : (
          <Button
            className="p_x_xxxl  m_b_xl_mobile w_100_per_mobile display_none_desktop"
            variant="outline"
            scale="small"
            icon={<SortFilter />}
            onClick={() => setModalOpen(true)}
          >
            Filtros
          </Button>
        )}
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="display_flex flex_col">
          <VehiclesFiltersInputs
            filterForm={filterForm}
            selectFilters={selectFilters}
            fillForm={fillForm}
            kms={kms}
          />
          <Button
            className="p_x_xxxl  m_b_xl_mobile w_100_per_mobile display_none_desktop"
            scale="small"
            icon={<SortFilter />}
            onClick={() => {
              if (filterEnabled) {
                filterVehicles();
              } else {
                resetVehicles();
              }
              setModalOpen(false);
            }}
          >
            Aplicar Filtros
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default VehiclesFilters;
