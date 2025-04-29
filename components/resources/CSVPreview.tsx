import { Resource } from "@portaljs/ckan";
import { FlatUiTable, getCsv, parseCsv } from "@portaljs/components";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Loader from "../_shared/Loader";

const queryClient = new QueryClient();

type ResourceWithSchema = Resource & { schema?: any };

function inferTypesFromFirstRow(firstRow) {
  const typeMap = {};
  for (const key in firstRow) {
    const value = firstRow[key];

    if (value == null || value === "") {
      typeMap[key] = "string"; // default to string if empty
    } else if (
      !isNaN(parseInt(value)) &&
      String(parseInt(value)) === String(value)
    ) {
      typeMap[key] = "integer";
    } else if (!isNaN(parseFloat(value))) {
      typeMap[key] = "number";
    } else {
      typeMap[key] = "string";
    }
  }
  return typeMap;
}

function cleanDataAccordingToSchema(data: any[], schema: any) {
  let typeMap = {};

  if (schema) {
    for (const field of schema?.fields) {
      typeMap[field.name] = field.type;
    }
  } else {
    typeMap = inferTypesFromFirstRow(data[0]);
  }

  return data.map((row) => {
    const newRow = {};
    for (const key in row) {
      const type = typeMap[key];

      if (!type) {
        newRow[key] = String(row[key]);
        continue;
      }
      const value = row[key];

      if (value == null || value === "") {
        newRow[key] = "";
        continue;
      }

      switch (type) {
        case "string":
          newRow[key] = String(value);
          break;
        case "integer":
          newRow[key] = parseInt(value, 10);
          if (isNaN(newRow[key])) newRow[key] = null;
          break;
        case "number":
          newRow[key] = parseFloat(value);
          if (isNaN(newRow[key])) newRow[key] = null;
          break;
        default:
          newRow[key] = String(value);
      }
    }
    return newRow;
  });
}

const TableView = ({ url, schema }: { url: string; schema: any }) => {
  const { data: csvString, isLoading: isDownloadingCSV } = useQuery(
    ["dataCsv", url],
    () => getCsv(url as string),
    { enabled: !!url }
  );
  const { data: parsedData, isLoading: isParsing } = useQuery(
    ["dataPreview", csvString],
    () => parseCsv(csvString),
    { enabled: csvString ? true : !!csvString }
  );

  return isDownloadingCSV || isParsing ? (
    <Loader/>
  ) : (
    <FlatUiTable
      data={cleanDataAccordingToSchema(parsedData?.data ?? [], schema)}
    />
  );
};

export default function CSVPreview({
  resource,
}: {
  resource: ResourceWithSchema;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TableView url={resource.url} schema={resource.schema} />
    </QueryClientProvider>
  );
}
