import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSubmitProposal, MsgVote, MsgVoteWeighted, MsgDeposit } from "./tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const MessageComposer: {
    encoded: {
        submitProposal(value: MsgSubmitProposal): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        vote(value: MsgVote): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        voteWeighted(value: MsgVoteWeighted): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
        deposit(value: MsgDeposit): {
            typeUrl: string;
            value: Uint8Array<ArrayBufferLike>;
        };
    };
    withTypeUrl: {
        submitProposal(value: MsgSubmitProposal): {
            typeUrl: string;
            value: MsgSubmitProposal;
        };
        vote(value: MsgVote): {
            typeUrl: string;
            value: MsgVote;
        };
        voteWeighted(value: MsgVoteWeighted): {
            typeUrl: string;
            value: MsgVoteWeighted;
        };
        deposit(value: MsgDeposit): {
            typeUrl: string;
            value: MsgDeposit;
        };
    };
    fromPartial: {
        submitProposal(value: MsgSubmitProposal): {
            typeUrl: string;
            value: MsgSubmitProposal;
        };
        vote(value: MsgVote): {
            typeUrl: string;
            value: MsgVote;
        };
        voteWeighted(value: MsgVoteWeighted): {
            typeUrl: string;
            value: MsgVoteWeighted;
        };
        deposit(value: MsgDeposit): {
            typeUrl: string;
            value: MsgDeposit;
        };
    };
};
