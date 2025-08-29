package excep;
import java.util.*;
public class Multipleexceptionexample {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
        try {
            System.out.print("Enter a number: ");
            String input=sc.nextLine();  
            int num=Integer.parseInt(input);
            int result=100/num;
            System.out.println("100 divided by "+num+"= "+result);
        }
        catch (NumberFormatException e) {
            System.out.println("Error: Input is not a valid integer!");
        }
        catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed!");
        }
        catch (Exception e) {
            System.out.println("Some other exception occurred: " + e);
        }
        finally {
            System.out.println("Program finished.");
        }
	}

}
