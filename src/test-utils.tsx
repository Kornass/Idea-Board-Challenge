import { FC, ReactNode } from "react";
import { IdeasContext } from "./context/IdeasContext";
import { render } from "@testing-library/react";

type AllTheProvidersProps = {
  children: ReactNode;
  customContext?: any;
};

const AllTheProviders: FC<AllTheProvidersProps> = ({
  children,
  customContext,
}) => (
  <IdeasContext.Provider
    value={{
      ...customContext,
    }}
  >
    {children}
  </IdeasContext.Provider>
);

const customRender = (ui: any, customContext?: any) =>
  render(ui, {
    // https://testing-library.com/docs/react-testing-library/api/#wrapper
    wrapper: () => (
      <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>
    ),
  });

export * from "@testing-library/react";

export { customRender as render };
