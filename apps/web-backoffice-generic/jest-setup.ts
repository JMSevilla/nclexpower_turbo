import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

global.TextEncoder = TextEncoder;
//@ts-ignore
global.TextDecoder = TextDecoder;
//@ts-ignore
global.userAgent = jest.spyOn(navigator, "userAgent", "get");
