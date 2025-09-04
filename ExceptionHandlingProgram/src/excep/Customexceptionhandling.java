package excep;
import java.util.*;
class AgeNotValidException extends Exception {
    public AgeNotValidException(String message) {
        super(message);
    }
}
public class Customexceptionhandling {
	static void checkAge(int age) throws AgeNotValidException {
        if(age<18) {
            throw new AgeNotValidException("Age must be 18 or above to vote.");
        }
        else {
            System.out.println("Eligible to vote!");
        }
    }
	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		int age=sc.nextInt();
		try {
            checkAge(age);
        }
		catch(AgeNotValidException e) {
            System.out.println("Exception: "+ e.getMessage());
        }
	}

}
