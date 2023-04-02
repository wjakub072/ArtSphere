import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./InvoiceData.css";

const InvoiceData = () => {
  useWebsiteTitle("Dane do faktury");
  return (
    <div className="user-invoice-data-wrap">
      <h2>Dane do faktury</h2>
      <form className="invoice-data-form">
        <label className="text-primary m-3">
          Nazwa firmy
          <input
            className="form-control"
            type="text"
            placeholder="Nazwa firmy"
          />
        </label>
        <label className="text-primary m-3">
          NIP
          <input className="form-control" type="text" placeholder="NIP" />
        </label>
        <label className="text-primary m-3">
          Ulica
          <input className="form-control" type="text" placeholder="Ulica" />
        </label>
        <label className="text-primary m-3">
          Numer domu
          <input
            className="form-control"
            type="text"
            placeholder="Numer domu"
          />
        </label>
        <label className="text-primary m-3">
          Numer lokalu
          <input
            className="form-control"
            type="text"
            placeholder="Numer lokalu"
          />
        </label>
        <label className="text-primary m-3">
          Kod pocztowy
          <input
            className="form-control"
            type="text"
            placeholder="Kod pocztowy"
          />
        </label>
        <label className="text-primary m-3">
          Miasto
          <input className="form-control" type="text" placeholder="Miasto" />
        </label>
        <label className="text-primary m-3">
          <select class="form-select">
            <option selected>Wybierz Kraj </option>
            <option value="1">Polska</option>
            <option value="2">Czehy</option>
            <option value="3">Niemcy</option>
          </select>
        </label>

        <input
          className="btn btn-primary"
          type="submit"
          value="Zapisz dane do faktury"
        />
      </form>
    </div>
  );
};

export default InvoiceData;
