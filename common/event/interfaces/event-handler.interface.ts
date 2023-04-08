import UseCase from '../../interfaces/base/use-case.interface';

type EventHandlerInterface<I = unknown> = UseCase<I, void>;
export default EventHandlerInterface;