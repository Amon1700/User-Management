import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Inputs {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

interface ModalProps {
  value: Inputs | {};
  url: string;
  close: () => void;
  method: "POST" | "PUT";
}

const Userform = (props: ModalProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: props.value });

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch(props.url, {
        method: props.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast(
        `User ${props.method === "POST" ? "added" : "updated"} successfully`,
        { type: "success", theme: "colored" }
      );
    } catch (error) {
      toast(
        `Error while ${props.method === "POST" ? "added" : "updated"} user`,
        { type: "error", theme: "colored" }
      );
    } finally {
      navigate("/");
      props.close();
    }
  };
  return (
    <div className="user-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="email">Email</label>
          </div>

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="phone">Phone</label>
          </div>

          <input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="username">Username</label>
          </div>

          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="address.street">Street</label>
          </div>

          <input
            {...register("address.street", { required: "Street is required" })}
          />
          {errors.address?.street && <p>{errors.address.street.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="address.city">City</label>
          </div>

          <input
            {...register("address.city", { required: "City is required" })}
          />
          {errors.address?.city && <p>{errors.address.city.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="company.name">Company</label>
          </div>

          <input
            {...register("company.name", {
              minLength: {
                value: 3,
                message: "company name must be at least 3 characters long",
              },
            })}
          />
          {errors.company?.name && <p>{errors.company.name.message}</p>}
        </div>

        <div>
          <div>
            <label htmlFor="website">Website</label>
          </div>

          <input
            {...register("website", {
              pattern: {
                value: /^(http|https):\/\/[^ "]+$/,
                message: "URL is not valid",
              },
            })}
          />
          {errors.website && <p>{errors.website.message}</p>}
        </div>

        <button type="submit" className="form-btn" disabled={isSubmitting}>
          {props.method === "POST" ? "Add User" : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default Userform;
