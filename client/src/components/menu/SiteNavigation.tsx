import { useNavigationByPermissions } from "@/hooks/useNavigationByPermissions";
import { Role } from "@/models/Account";
import useAccountStore from "@/stores/accountStore";
import { Button } from "@mui/material";
import { FC } from "react";

const SiteNavigation: FC = () => {
  const role: Role = useAccountStore((state) => state.role);
  const navigationItems = useNavigationByPermissions(role);

  return (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.key}
          sx={{ my: 2, color: "primary.contrastText", display: "block" }}
        >
          {item.link}
        </Button>
      ))}
    </>
  );
};

export default SiteNavigation;
