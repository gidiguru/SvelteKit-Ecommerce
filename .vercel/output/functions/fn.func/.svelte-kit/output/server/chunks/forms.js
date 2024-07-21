import * as devalue from "devalue";
import "./client.js";
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = devalue.parse(parsed.data);
  }
  return parsed;
}
export {
  deserialize as d
};
