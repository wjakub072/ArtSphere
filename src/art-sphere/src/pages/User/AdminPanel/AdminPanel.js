import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

function AdminPanel(props) {
  useWebsiteTitle('Panel administratora');
  return (
    <h2>Kiedyś to będzie panel administratora</h2>
  );
}
export default AdminPanel;